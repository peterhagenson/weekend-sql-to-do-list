CREATE TABLE "weekend-to-do-app" (
    "id" serial PRIMARY KEY,
    "task" varchar(80) NOT NULL,
    "status" varchar(40)
    );
    
INSERT INTO "weekend-to-do-app" (task, status)
VALUES ('brush teeth', 'complete');