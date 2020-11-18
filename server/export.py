from typing import List
from pymongo import MongoClient
from pymongo import cursor
import pandas
import numpy as np
from bson.json_util import dumps

client = MongoClient('localhost', 27017)
db = client.fric
tasks = db.tasks
cursor = tasks.find()
docs = list(cursor)
docs = docs[:25]
series_obj = pandas.Series({"one":"index"})
series_obj.index=["one"]
print("Index: " + series_obj.index)


def writeToJSONFile(collection):

    client = MongoClient('localhost', 27017)
    db = client.fric
    tasks = db.tasks
    cursor = tasks.find()
    docs = list(cursor)
    docs = docs[:25]
    series_obj = pandas.Series({"one":"index"})
    series_obj.index=["one"]
    print("Index: " + series_obj.index)


    cursor = collection.find({})
    file = open("collection.json", "w")
    file.write('[')
    qnt_cursor = 0
    for document in cursor:
        qnt_cursor += 1
        num_max = 10
        if (num_max == 1):
            file.write(dumps(document, indent=4))
        elif (num_max >= 1 and qnt_cursor <= num_max-1):
            file.write(dumps(document, indent=4))
            file.write(',')
        elif (qnt_cursor == num_max):
            file.write(dumps(document, indent=4))
    file.write(']')
    return file

if __name__ == "__main__":
    print(writeToJSONFile(tasks))