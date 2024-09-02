-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "telegramId" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "username" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "referrals" INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
