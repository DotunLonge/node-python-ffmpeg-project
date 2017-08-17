import os.path
import sys

from pydub import AudioSegment
arr = []
for line in sys.stdin:
    arr.append(line.strip('\n'))

main_clip = AudioSegment.from_file(arr[0])
overlay_clip = AudioSegment.from_file(arr[1])

length = int(arr[4]) * 10000
shortClip = main_clip[:length]
interval = int(arr[2]) * 1000 # milliseconds
new_clip = shortClip

for i in range(interval, len(shortClip), interval):
    new_clip = new_clip.overlay(overlay_clip, position=i)
new_clip.export(arr[3], format='mp3')

print os.path.exists(arr[3])
