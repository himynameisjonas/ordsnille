require "bundler/setup"
Bundler.require
words = []
words |= File.readlines('saol2018clean.txt').map { _1.split(",")[1]}
# words |= File.readlines('raw_words.txt')
# words |= File.readlines('swe_wordlist_5.txt')
blocklist = File.readlines('blocklist.txt').map &:strip
# words |= File.readlines('dictionary.txt')
puts words.size
words.map! do |word|
  next if word.include?('-')
  next if word.include?(' ')
  next if word.include?('.')
  next if word.include?(':')
  next if word.include?('é')
  word.strip!
  next unless word.length == 5
  next if blocklist.include?(word)
  "'#{word}'"
end

# open('../src/lib/words.js', 'w') do |f|
#   f.puts "export default ["
#   f.puts words.compact.uniq.shuffle(random: Random.new(3)).join(',')
#   f.puts "];"
# end

open('scrubbed.txt', 'w') do |f|
  words.compact.uniq.shuffle.each {
    f.puts '"' + _1.downcase.gsub("'","") + '",'
  }
end
