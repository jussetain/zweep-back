-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_in" INTEGER NOT NULL DEFAULT 86400,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);
