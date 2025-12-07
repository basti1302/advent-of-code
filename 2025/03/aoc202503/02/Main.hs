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
    digitsAsStr = (map (:[])) l
    digitsAsInts = map (\d -> read d :: Integer) digitsAsStr
    digits = map (\d -> (d, False)) digitsAsInts

    lineLength = length digitsAsInts

    (digit1, idx1, newDigits1)    = findMaxAndUpdateUsed 0           (lineLength - 11) digits
    (digit2, idx2, newDigits2)    = findMaxAndUpdateUsed (idx1  + 1) (lineLength - 10) newDigits1
    (digit3, idx3, newDigits3)    = findMaxAndUpdateUsed (idx2  + 1) (lineLength - 9) newDigits2
    (digit4, idx4, newDigits4)    = findMaxAndUpdateUsed (idx3  + 1) (lineLength - 8) newDigits3
    (digit5, idx5, newDigits5)    = findMaxAndUpdateUsed (idx4  + 1) (lineLength - 7) newDigits4
    (digit6, idx6, newDigits6)    = findMaxAndUpdateUsed (idx5  + 1) (lineLength - 6) newDigits5
    (digit7, idx7, newDigits7)    = findMaxAndUpdateUsed (idx6  + 1) (lineLength - 5) newDigits6
    (digit8, idx8, newDigits8)    = findMaxAndUpdateUsed (idx7  + 1) (lineLength - 4) newDigits7
    (digit9, idx9, newDigits9)    = findMaxAndUpdateUsed (idx8  + 1) (lineLength - 3) newDigits8
    (digit10, idx10, newDigits10) = findMaxAndUpdateUsed (idx9  + 1) (lineLength - 2) newDigits9
    (digit11, idx11, newDigits11) = findMaxAndUpdateUsed (idx10 + 1) (lineLength - 1) newDigits10
    (digit12, _, _)               = findMaxAndUpdateUsed (idx11 + 1) lineLength       newDigits11
  in
  read (
    (show digit1) ++
    (show digit2) ++
    (show digit3) ++
    (show digit4) ++
    (show digit5) ++
    (show digit6) ++
    (show digit7) ++
    (show digit8) ++
    (show digit9) ++
    (show digit10) ++
    (show digit11) ++
    (show digit12)
  ) :: Integer

