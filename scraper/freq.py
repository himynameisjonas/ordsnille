from wordfreq import zipf_frequency

frequent_file = open("frequent.txt", "w")
more_file = open("more.txt", "w")


with open("scrubbed.txt") as file:
  words = file.readlines()
  words = [line.rstrip() for line in words]
  for word in words:
    if zipf_frequency(word, 'sv') >= 3:
      frequent_file.write(word + "\n")
    else:
      more_file.write(word + "\n")

frequent_file.close()
more_file.close()
