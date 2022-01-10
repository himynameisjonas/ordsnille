require "bundler/setup"
Bundler.require
words = []
words |= File.readlines('saol2018clean.txt').map { _1.split(",")[1]}
words |= File.readlines('raw_words.txt')
# words |= File.readlines('dictionary.txt')
puts words.size
words.map! do |word|
  next if word.include?('-')
  next if word.include?(' ')
  next if word.include?('é')
  next if /[[:upper:]]/.match(word)
  word.strip!
  next unless word.length == 5
  "'#{word}'"
end

open('../src/lib/words.js', 'w') do |f|
  f.puts "export default ["
  f.puts words.compact.uniq.shuffle(random: Random.new(3)).join(',')
  f.puts "];"
end

open('scrubbed.txt', 'w') do |f|
  words.compact.uniq.sort.each {
    f.puts _1.gsub("'","")
  }
end
