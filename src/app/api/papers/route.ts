import { NextRequest, NextResponse } from "next/server";
import Paper from "@/models/Paper";
import { ensureDBConnection } from "@/lib/ensureDB";

// Connect to the database before handling any request

// Handle GET requests to fetch papers
export async function GET(req: NextRequest) {
  await ensureDBConnection();

  const { searchParams } = new URL(req.url);
  const paperId = searchParams.get("id"); // Check if there's a paper ID provided in the query

  try {
    if (paperId) {
      const paper = await Paper.findById(paperId);
      if (!paper) {
        return NextResponse.json(
          { message: "Paper not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(paper);
    }

    const papers = await Paper.find({});
    return NextResponse.json(papers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch papers", details: error.message },
      { status: 500 }
    );
  }
}

// Handle POST requests to create a new paper
export async function POST(req: NextRequest) {
  await ensureDBConnection();

  try {
    // Parse request body to extract paper fields
    const {
      title,
      authors,
      abstract,
      tags,
      adminTags,
      department,
      declaration,
      hiddenByAdmin,
      hiddenByUser,
      status,
    } = await req.json();

    // Create a new Paper instance
    const newPaper = new Paper({
      title,
      authors,
      abstract,
      tags,
      adminTags,
      department,
      declaration,
      hiddenByAdmin,
      hiddenByUser,
      status: 0,
      date: new Date(),
      created: new Date(),
      lastModified: new Date(),
      meta: {
        upvotes: 0,
        favorite: 0,
      },
    });

    // Save the new paper to the database
    const savedPaper = await newPaper.save();

    // Respond with the created paper
    return NextResponse.json(
      { message: "Paper created successfully", paper: savedPaper },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create paper", details: error.message },
      { status: 500 }
    );
  }
}

// Handle PUT requests to update an existing paper
export async function PUT(req: NextRequest) {
  await ensureDBConnection();

  try {
    const { searchParams } = new URL(req.url);
    const paperId = searchParams.get("id"); // Get the paper ID from the query params

    if (!paperId) {
      return NextResponse.json(
        { error: "Paper ID is required for updating" },
        { status: 400 }
      );
    }

    // Parse request body to extract update data
    const data = await req.json();

    // Ensure lastModified date is updated
    data.lastModified = new Date();

    // Find and update the paper
    const updatedPaper = await Paper.findByIdAndUpdate(paperId, data, {
      new: true,
    });

    if (!updatedPaper) {
      return NextResponse.json({ message: "Paper not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Paper updated successfully",
      paper: updatedPaper,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update paper", details: error.message },
      { status: 500 }
    );
  }
}

// Handle DELETE requests to delete a paper
export async function DELETE(req: NextRequest) {
  await ensureDBConnection();

  try {
    const { searchParams } = new URL(req.url);
    const paperId = searchParams.get("id"); // Get the paper ID from the query params

    if (!paperId) {
      return NextResponse.json(
        { error: "Paper ID is required for deletion" },
        { status: 400 }
      );
    }

    const deletedPaper = await Paper.findByIdAndDelete(paperId);
    if (!deletedPaper) {
      return NextResponse.json({ message: "Paper not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Paper deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete paper", details: error.message },
      { status: 500 }
    );
  }
}
