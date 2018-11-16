const { getSortedComments, filterData, renderPagination, opt } = require('../src/script')
const data = [
  {
    id: 1,
    postId: 1,
    body: "laudantium enim adlas",
    email: "Eliseo@gardner.biz",
    name: "id labore ex et quam laborum"
  },
  {
    id: 2,
    postId: 1,
    body: "laudantium enim asdas asdasd asd",
    email: "Eliseo@gardner.biz",
    name: "id labore ex et quam laborum"
  },
  {
    id: 3,
    postId: 1,
    body: "laudantium enim pa ss dajs d",
    email: "Eliseo@gardner.biz",
    name: "id labore ex et quam laborum"
  },
  {
    id: 4,
    postId: 1,
    body: "laudantium enim",
    email: "Eliseo@gardner.biz",
    name: "id labore ex et quam laborum"
  },
  {
    id: 5,
    postId: 1,
    body: "laudantium enim",
    email: "Eliseo@gardner.biz",
    name: "id labore ex et quam laborum"
  },
]
describe("test function", () => {
  it("data should be sorted descending", () => {
    const expectedData = data.reverse()
    expect(getSortedComments(data, "id", "desc")).toEqual(expectedData)
  })

  it("filter data with certain query", () => {
    const expectedData = [
      {
        id: 1,
        postId: 1,
        body: "laudantium enim adlas",
        email: "Eliseo@gardner.biz",
        name: "id labore ex et quam laborum"
      },
    ]
    expect(filterData(data, "body", "adlas")).toEqual(expectedData)
  })
})

describe("render pagination", () => {
  const getElementSpy = jest.spyOn(document, "getElementById")
  const createElementSpy = jest.spyOn(document, "createElement")

  beforeAll(() => {
    getElementSpy.mockImplementation(() => {
      return {
        innerHTML: "",
        appendChild: () => { }
      }
    })
    createElementSpy.mockImplementation(() => {
      return {
        classList: { add: () => { } },
        addEventListener: () => { },
        setAttribute: () => { },
        appendChild: () => { },
        disabled: ""
      }
    })
  })

  test("should call getElementById once", () => {
    renderPagination(2)
    expect(getElementSpy).toBeCalledTimes(1)
  })

  test("should set current page button disabled", () => {
    opt.comments = data
    opt.commentLimit = 3

    renderPagination(2)
    expect(createElementSpy).toBeCalledTimes(2)
  })

  afterAll(() => {
    getElementSpy.mockRestore()
    createElementSpy.mockRestore()
  })

  
})