require "bundler/setup"
Bundler.require

frequent_words = File.readlines('frequent.txt')
frequent_words.map! do |word|
  "'#{word.strip}'"
end

more_words = File.readlines('more.txt')
more_words.map! do |word|
  "'#{word.strip}'"
end

open('../src/lib/words.js', 'w') do |f|
  f.puts "export const frequentWords = ["
  f.puts frequent_words.compact.uniq.shuffle(random: Random.new(4)).join(',')
  f.puts "];"

  f.puts "export const moreWords = ["
  f.puts more_words.compact.uniq.shuffle(random: Random.new(4)).join(',')
  f.puts "];"
  f.puts "export const allWords = [...frequentWords, ...moreWords];"
end
