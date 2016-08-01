@abcd
Feature: test the feature of CRUD

    Scenario: Create a person into database
        Given The database is empty.
        When Execute the method of create.
        | _id         | name        | age | birthday            | 
        | abcdefghijk | Bibby Chung | 18  | 1991-03-07 08:34:00 | 
        Then The result of database has a record.
        | _id         | name        | age | birthday            | 
        | abcdefghijk | Bibby Chung | 18  | 1991-03-07 08:34:00 | 

    Scenario: Delete the person in database
        Given The database has a record.
        | _id         | name        | age | birthday            | 
        | abcdefghijk | Bibby Chung | 18  | 1991-03-07 08:34:00 | 
        When Execute the method of delete.
        Then The result of database is empty.
    
    Scenario: Update the person in database
        Given The database has a record.
        | _id         | name        | age | birthday            | 
        | abcdefghijk | Bibby Chung | 18  | 1991-03-07 08:34:00 | 
        When Execute the method of update.
        | _id         | name         | age | birthday            | 
        | abcdefghijk | Bibby Chung1 | 22  | 2000-02-02 00:00:00 | 
        Then The result of database has a record.
        | _id         | name         | age | birthday            | 
        | abcdefghijk | Bibby Chung1 | 22  | 2000-02-02 00:00:00 | 