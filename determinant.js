class MatrixError extends Error {}
function isNxN(matrix){
  let rows = matrix.length
  for(let row of matrix){
    if(rows != row.length) return false
  }
  return true
}
function coeffBin(matrix, row, col){
  let res = []
  for(let i = 0; matrix.length > i; i++){
    let tmp = []
    for(let j = 0; matrix.length > j; j++){
      if(i != row && j != col) tmp.push(matrix[i][j])
    }
    if(tmp.length > 0) res.push(tmp)
  }
  return [matrix[row][col],res,(row+1)+(col+1)]
}
function det(matrix){
  try {
    if(!isNxN(matrix)) throw new MatrixError('matrix is not NxN')
  } catch(e){
    if(e instanceof MatrixError) return `<ERROR> : ${e.message}`
  }
  let top = left = res = 0, bottom = right = matrix.length - 1;
  if(matrix.length == 2){
    return (matrix[top][left] * matrix[bottom][right]) - (matrix[top][right] * matrix[bottom][left])
  } else {
    let row = col = 0
    let d = []
    while(matrix.length > row){
      d.push(coeffBin(matrix, row, col))
      row++
    }
    while(d.length > 0){
      let current = d.shift()
      let c = 1
      if(current[current.length-1] % 2 != 0) c = -1
      res += c * current[0] * det(current[1])
    }
  }
  return res
}
