module Lib
    ( findMaxAndUpdateUsed
    ) where


import           Data.List (maximumBy)
import           GHC.Num   (integerToInt)


findMaxAndUpdateUsed :: Int -> Int -> [(Integer, Bool)] -> (Integer, Int, [(Integer, Bool)])
findMaxAndUpdateUsed start end digits =
  let
    (beforeStart, fromStartToLineEnd) = splitAt start digits
    (searchRange, afterEnd) = splitAt (end-start) fromStartToLineEnd
    (maxIdx', maxTuple) =
      maximumBy compareUnused (zip [0..] searchRange)
    maxIdx = (integerToInt maxIdx')

    maxValue = fst maxTuple
    (srHd,_:srTl) =
      splitAt maxIdx searchRange
    updatedDigits = beforeStart ++ srHd ++ [(maxValue, True)] ++ srTl ++ afterEnd
  in
  (maxValue, maxIdx + start, updatedDigits)

compareUnused ::
  (Integer, (Integer, Bool))
  -> (Integer, (Integer, Bool))
  -> Ordering
compareUnused (_, (x1, u1)) (_, (x2, u2)) =
  if u1 && not u2 then LT
  else if not u1 && u2 then GT
  else if x1 > x2 then GT
  else if x1 < x2 then LT
  -- make sure we select the first of the equally high elements
  else GT
