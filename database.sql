CREATE TABLE "weekend-to-do-app" (
    "id" serial PRIMARY KEY,
    "task" varchar(80) NOT NULL,
    "complete" boolean
    );
    
INSERT INTO "weekend-to-do-app" (task, complete)
VALUES ('brush teeth', true);

INSERT INTO "weekend-to-do-app" (task, complete)
VALUES ('wash clothes', false);

DROP TABLE "weekend-to-do-app";

UPDATE "weekend-to-do-app"
SET "complete" = TRUE
WHERE "id" = 1;