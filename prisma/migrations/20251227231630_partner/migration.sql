/*
  Warnings:

  - You are about to drop the column `coverageArea` on the `partners` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `partners` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `partners` table. All the data in the column will be lost.
  - You are about to drop the column `tradingName` on the `partners` table. All the data in the column will be lost.
  - Added the required column `coverage_area` to the `partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_name` to the `partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trading_name` to the `partners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "partners" DROP COLUMN "coverageArea",
DROP COLUMN "createdAt",
DROP COLUMN "ownerName",
DROP COLUMN "tradingName",
ADD COLUMN     "coverage_area" geometry NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "owner_name" TEXT NOT NULL,
ADD COLUMN     "trading_name" TEXT NOT NULL;
