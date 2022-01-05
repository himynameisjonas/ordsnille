require "bundler/setup"
Bundler.require

words = File.readlines('raw_words.txt')
words.map! do |word|
  next if word.include?('-')
  next if word.include?(' ')
  "'#{word.strip}'"
end

open('src/words.js', 'w') do |f|
  f.puts "export default ["
  f.puts words.compact.shuffle(random: Random.new(1)).join(',')
  f.puts "];"
end
