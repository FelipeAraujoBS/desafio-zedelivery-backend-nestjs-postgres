/*
  Warnings:

  - The primary key for the `partners` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `coverage_area` on the `partners` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `partners` table. All the data in the column will be lost.
  - You are about to drop the column `owner_name` on the `partners` table. All the data in the column will be lost.
  - You are about to drop the column `trading_name` on the `partners` table. All the data in the column will be lost.
  - Added the required column `coverageArea` to the `partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerName` to the `partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradingName` to the `partners` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "idx_partners_address";

-- DropIndex
DROP INDEX "idx_partners_coverage_area";

-- AlterTable
ALTER TABLE "partners" DROP CONSTRAINT "partners_pkey",
DROP COLUMN "coverage_area",
DROP COLUMN "created_at",
DROP COLUMN "owner_name",
DROP COLUMN "trading_name",
ADD COLUMN     "coverageArea" geometry NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ownerName" TEXT NOT NULL,
ADD COLUMN     "tradingName" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "partners_pkey" PRIMARY KEY ("id");
