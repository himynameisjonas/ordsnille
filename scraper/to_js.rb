require "bundler/setup"
Bundler.require

frequent_words = File.readlines('frequent.txt')
frequent_words.map! do |word|
  "'#{word.strip}'"
end

more_words = File.readlines('scrubbed.txt')
more_words.map! do |word|
  w = "'#{word.strip}'"
  next if frequent_words.include?(w)
  w
end

used_words = [
  "'strör'",
  "'kavaj'",
  "'vemod'",
  "'plask'",
  "'leder'",
  "'medla'",
  "'skans'",
  "'mygel'",
  "'pudla'",
  "'dröja'",
  "'ambra'",
  "'uppåt'",
  "'gissa'",
  "'sugen'",
  "'oljud'",
  "'mötet'",
  "'rapid'",
  "'härma'",
  "'gjord'",
  "'undre'",
  "'small'",
  "'huvet'",
  "'bilen'",
  "'radie'",
  "'slick'",
  "'delen'",
  "'mesig'",
  "'naiva'",
  "'yacht'",
  "'färja'",
  "'nacke'",
  "'pepsi'",
]

frequent_words = frequent_words.compact.uniq.shuffle(random: Random.new(4))
used_words.each { frequent_words.delete _1 }
frequent_words = used_words | frequent_words

open('../src/lib/words.js', 'w') do |f|
  f.puts "export const frequentWords = ["
  f.puts frequent_words.join(',')
  f.puts "];"

  f.puts "export const moreWords = ["
  f.puts more_words.compact.uniq.shuffle(random: Random.new(4)).join(',')
  f.puts "];"
  f.puts "export const allWords = [...frequentWords, ...moreWords];"
end
