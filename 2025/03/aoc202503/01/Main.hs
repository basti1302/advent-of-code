module Main (main) where

import           Lib

main :: IO ()
main = do
  content <- readFile "input.txt"
  let
    allLines = lines content
    joltagesPerLine = map lineToMaxJoltage allLines
    result = sum joltagesPerLine
  putStrLn $ "Result: " ++ (show result)


lineToMaxJoltage :: String -> Integer
lineToMaxJoltage l =
  let
    lineLength = length digitsAsInts
    -- lengths = reverse $ [ i | i <- [1 .. lineLength - 2]]

    digitsAsStr = (map (:[])) l
    digitsAsInts = map (\d -> read d :: Integer) digitsAsStr
    digits = map (\d -> (d, False)) digitsAsInts

    (digit1, idx1, newDigits) = findMaxAndUpdateUsed 0 (lineLength - 1) digits
    (digit2, _, _) = findMaxAndUpdateUsed idx1 lineLength newDigits
  in
  read ((show digit1) ++ (show digit2)) :: Integer

