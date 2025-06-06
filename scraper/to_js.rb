require "bundler/setup"
Bundler.require

frequent_words = File.readlines('frequent.txt')
# frequent_words.map! do |word|
#   "'#{word.strip}'" un
# end

scrubbed_words = File.readlines('scrubbed.txt')
scrubbed_words = scrubbed_words.filter_map do |word|
  next if frequent_words.include?(word)
  word
end

more_words = File.readlines('more.txt')
more_words = more_words.filter_map do |word|
  next if scrubbed_words.include?(word) || frequent_words.include?(word)
  word
end

open('../src/lib/words.js', 'w') do |f|
  f.puts "export const frequentWords = ["
  f.puts frequent_words.join(' ')
  f.puts "];"

  f.puts "export const moreWords = ["
  f.puts more_words.join(' ')
  f.puts "];"

  f.puts "export const moreWords2 = ["
  f.puts scrubbed_words.compact.uniq.shuffle(random: Random.new(4)).join(' ')
  f.puts "];"
  f.puts "export const allWords = [...frequentWords, ...moreWords, ...moreWords2];"
end
