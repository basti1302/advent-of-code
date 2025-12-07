module Main (main) where

import           Data.List (tails)

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
    chars = (map (:[])) l
    ints = map (\c -> read c :: Integer) chars
  in findMaxJoltage ints

findMaxJoltage :: [Integer] -> Integer
findMaxJoltage ints =
  let
    ps =  allPairs ints
    joltages = map (\ (x,y) -> read (show x ++ show y) :: Integer) ps
  in maximum joltages

allPairs :: [a] -> [(a, a)]
allPairs xs =
  [ (x, y)
  | (x:ys) <- tails xs
  , y      <- ys
  ]

