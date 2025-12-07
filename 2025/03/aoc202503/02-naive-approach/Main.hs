module Main (main) where

import           Data.List (tails)
-- import           Debug.Trace

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
    dds = allDuoDecuplets ints
    joltages =
      map
        (\ (x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12) ->
             read (
               show  x1 ++
               show  x2 ++
               show  x3 ++
               show  x4
               show  x5 ++
               show  x6 ++
               show  x7 ++
               show  x8 ++
               show  x9 ++
               show x10 ++
               show x11 ++
               show x12
             ) :: Integer)
        dds
  in maximum joltages

allDuoDecuplets  :: [a] -> [(a, a, a, a, a, a, a, a, a, a, a, a)]
allDuoDecuplets digits =
  [ (x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12)
  | (x1:rest1)   <- tails digits
  , (x2:rest2)   <- tails rest1
  , (x3:rest3)   <- tails rest2
  , (x4:rest4)   <- tails rest3
  , (x5:rest5)   <- tails rest4
  , (x6:rest6)   <- tails rest5
  , (x7:rest7)   <- tails rest6
  , (x8:rest8)   <- tails rest7
  , (x9:rest9)   <- tails rest8
  , (x10:rest10) <- tails rest9
  , (x11:rest11) <- tails rest10
  , x12          <- rest11
  ]

