-- AlterTable
ALTER TABLE `task` MODIFY `startDate` BIGINT NOT NULL,
    MODIFY `completeDate` BIGINT NULL,
    MODIFY `interruptDate` BIGINT NULL;
