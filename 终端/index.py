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

#  注意修改你的服务器地址
localUrl = "http://192.168.1.131:3000/sensor/getSensorList"
remoteUrl = "http://101.201.65.247/sensor/update"
testurl = "http://192.168.1.116:3000/sensor/update"
contorlUrl = 'http://192.168.1.116:3000/command/detail'

tempuareSensor=Adafruit_DHT.DHT11

GPIO.setmode(GPIO.BCM)

# this GPIO set foo input
GPIO.setup(lightChanel, GPIO.IN)
GPIO.setup(rainChannel, GPIO.IN)
GPIO.setup(soilChannel, GPIO.IN)

# 每次启动前关闭多余链接
requests.adapters.DEFAULT_RETRIES = 5 
server = requests.session()
server.keep_alive = False


while True:
    
    headers = {'content-type': "application/json"}
    #首先拿到配置信息
    controlRule = requests.get(contorlUrl).json()
    print("control cmd is {0}".format(controlRule))
     
    #response = requests.get(localUrl, {})
   
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
         "light": light,
     
         }),headers=headers).json()
    
    

    time.sleep(10)

