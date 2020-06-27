#coding=utf-8
import RPi.GPIO as GPIO
import Adafruit_DHT
import time
import requests
import json


#lightChanel light is 0, dark is 1
lightChanel = 22
tempuareChannel = 17
rainChannel = 4
soilChannel = 27

localUrl = "http://192.168.1.18:3000/sensor/getSensorList"
remoteUrl = "http://101.201.65.247/sensor/update"
testurl = "http://192.168.1.18:3000/sensor/update"

tempuareSensor=Adafruit_DHT.DHT11

GPIO.setmode(GPIO.BCM)

# this GPIO set foo input
GPIO.setup(lightChanel, GPIO.IN)
GPIO.setup(rainChannel, GPIO.IN)
GPIO.setup(soilChannel, GPIO.IN)

while True:
    #response = requests.get(localUrl, {})
   
    headers = {'content-type': "application/json"}
    
    humidity, temperature = Adafruit_DHT.read_retry(tempuareSensor, tempuareChannel)
    light = GPIO.input(lightChanel)
    hasRanin = GPIO.input(rainChannel)
    hasDirty = GPIO.input(soilChannel)
 
    print("humidity is {0},temperature is {1}, hasRanin ? {2},hasDirty ? {3}, light={4}".format(humidity,temperature,hasRanin,hasDirty,light))
    
    
     
    response01 = requests.post(testurl, data=json.dumps({
         "deviceId": "01",
         "rainStatus":hasRanin,
         "humidity":humidity,
         "temperature":temperature,
         "solidStatus":hasDirty,
     
         }),headers=headers).json()
    
    print(response01)
   
   
     
    time.sleep(10)
