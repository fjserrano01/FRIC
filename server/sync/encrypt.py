from typing import List
from pymongo import MongoClient
from pymongo import cursor
import pandas
import numpy as np
from bson.json_util import dumps


# Converts MongoDB collections into JSON 

def writeToJSONFile():

    client = MongoClient('localhost', 27017)
    db = client.fric
    
    #docs = docs[:25]
    series_obj = pandas.Series({"one":"index"})
    series_obj.index=["one"]
    #print("Index: " + series_obj.index)
    tasks = db.tasks
    cursor = tasks.find()
    docs = list(cursor)
    docus = pandas.DataFrame(columns=[])
    for doc in enumerate(docs):
        series_obj=pandas.Series(doc, name=doc[0])


    json_export = dumps(docs) # return JSON data

    return json_export

    

if __name__ == "__main__":
    print(writeToJSONFile())