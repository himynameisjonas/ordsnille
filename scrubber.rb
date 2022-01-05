require "bundler/setup"
Bundler.require

words = File.readlines('raw_words.txt')
open('words.txt', 'w') do |f|
  words.each do |word|
    next if word.include?('-')
    next if word.include?(' ')
    f.puts word
  end
end
