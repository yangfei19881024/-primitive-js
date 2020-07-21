function* test() {
  let res = yield "hello"
  console.log(res)
  let res1 = yield "world"
  console.log(res1)
  return res1
}

// let t = test()

// console.log(t.next())
// console.log(t.next("value"))

function co(fn) {
  return new Promise((resolve, reject) => {
    let it = fn()

    function next(data) {
      let { done, value } = it.next(data)
      if (done) {
        resolve(value)
      } else {
        Promise.resolve(value).then((data) => next(data))
      }
    }

    next()
  })
}

co(test).then((data) => {
  console.log("最终结果!!!!!")
  console.log(data)
})
