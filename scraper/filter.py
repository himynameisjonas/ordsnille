from wordfreq import zipf_frequency

filtered = open("filtered.txt", "w")
non_filtered = open("non_filtered.txt", "w")


with open("swe_wordlist_5.txt") as file:
  words = file.readlines()
  words = [line.rstrip() for line in words]
  for word in words:
    if zipf_frequency(word, 'sv') >= 3:
      filtered.write(word + "\n")
    else:
      non_filtered.write(word + "\n")

filtered.close()
non_filtered.close()
