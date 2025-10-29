// File: src/app/api/history/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/app/libs/prisma";

// POST - Add or update watch history
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Check if user is authenticated
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - Silakan login terlebih dahulu" },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // 2. Parse request body
    const body = await request.json();
    const { animeId, episodeId, title, image, episodeNumber, animeTitle, duration } = body;

    if (!animeId || !episodeId) {
      return NextResponse.json(
        { error: "Data tidak lengkap - animeId dan episodeId diperlukan" },
        { status: 400 }
      );
    }

    // 3. Upsert watch history entry
    const historyEntry = await prisma.watchHistory.upsert({
      where: {
        userId_episodeId: {
          userId: currentUser.id,
          episodeId: episodeId,
        },
      },
      update: {
        title: title || animeTitle,
        image: image,
        episodeNumber: episodeNumber,
        animeTitle: animeTitle,
        duration: duration,
        watchedAt: new Date(),
      },
      create: {
        userId: currentUser.id,
        animeId: animeId,
        episodeId: episodeId,
        title: title || animeTitle,
        image: image,
        episodeNumber: episodeNumber,
        animeTitle: animeTitle,
        duration: duration,
        watchedAt: new Date(),
      },
    });

    // 4. Update user's lastActive timestamp
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { lastActive: new Date() },
    });

    return NextResponse.json({
      success: true,
      message: "History berhasil disimpan",
      data: historyEntry
    }, { status: 200 });

  } catch (error) {
    console.error("HISTORY_POST_ERROR", error);
    
    // Handle Prisma unique constraint errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Data history sudah ada" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// GET - Retrieve user's watch history
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - Silakan login terlebih dahulu" },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // Get query parameters for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;

    // Get user's watch history with pagination
    const history = await prisma.watchHistory.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        watchedAt: 'desc', // Latest first
      },
      skip: skip,
      take: limit,
      select: {
        id: true,
        animeId: true,
        episodeId: true,
        title: true,
        image: true,
        episodeNumber: true,
        animeTitle: true,
        duration: true,
        watchedAt: true,
        anime: {
          select: {
            title: true,
            slug: true,
            status: true,
          }
        }
      }
    });

    // Get total count for pagination
    const totalCount = await prisma.watchHistory.count({
      where: {
        userId: currentUser.id,
      },
    });

    return NextResponse.json({
      success: true,
      data: history,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page < Math.ceil(totalCount / limit),
        hasPrev: page > 1,
      }
    }, { status: 200 });

  } catch (error) {
    console.error("HISTORY_GET_ERROR", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// DELETE - Remove specific history entry or clear all
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - Silakan login terlebih dahulu" },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const historyId = searchParams.get('id');
    const clearAll = searchParams.get('clearAll') === 'true';

    if (clearAll) {
      // Clear all user's watch history
      await prisma.watchHistory.deleteMany({
        where: {
          userId: currentUser.id,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Semua history berhasil dihapus"
      }, { status: 200 });
    }

    if (historyId) {
      // Delete specific history entry
      const deletedHistory = await prisma.watchHistory.delete({
        where: {
          id: historyId,
          userId: currentUser.id, // Ensure user can only delete their own history
        },
      });

      return NextResponse.json({
        success: true,
        message: "History berhasil dihapus",
        data: deletedHistory
      }, { status: 200 });
    }

    return NextResponse.json(
      { error: "Parameter tidak valid" },
      { status: 400 }
    );

  } catch (error) {
    console.error("HISTORY_DELETE_ERROR", error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "History tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
