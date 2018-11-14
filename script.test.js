const { getCommentsByBody } = require('./script')

describe('search data with certain query', () => {
  it('should return data based on determined query', () => {
    const data = [{ nama: "udin", age: 40, body: "cakep banget" }, { nama: "shotozuro", age: 22, body: "ganteng banget"}]
    const query = "cakep"
    expect(getCommentsByBody(data, query)).toEqual([{ nama: "udin", age: 40, body: "cakep banget" }])
  })

  it('should return all comments if query is empty', () => {
    const data = [{ nama: "udin", age: 40, body: "cakep banget" }, { nama: "shotozuro", age: 22, body: "ganteng banget" }]
    const query = ""
    expect(getCommentsByBody(data, query)).toEqual([...data])
  })

  it('should return empty comments if query does not match with any comments', () => {
    const data = [{ nama: "udin", age: 40, body: "cakep banget" }, { nama: "shotozuro", age: 22, body: "ganteng banget" }]
    const query = "test"
    expect(getCommentsByBody(data, query)).toEqual([])
  })
});
