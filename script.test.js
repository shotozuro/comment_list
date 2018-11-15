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

it('currentPage button should disabled', () => {
  const mockElem = {
    innerHTML: "",
    getElementsByTagName: sinon.stub(),
    appendChild: sinon.stub()
  }
  const elementByIdStub = sinon.stub(document, "getElementById")
  elementByIdStub.withArgs("list").returns(mockElem)
  elementByIdStub.withArgs("pagination").returns(mockElem)
  elementByIdStub.callThrough()
  const pageElement = {
    set disabled (value) {
      chai.expect(value).to.be.true
    },
    addEventListener: sinon.stub(),
    classList: {
      add: sinon.stub()
    },
    setAttribute: sinon.stub(),
    appendChild: sinon.stub()
  }
  const createElementStub = sinon.stub(document, "createElement")
  createElementStub.withArgs("button").returns(pageElement)
  createElementStub.callThrough()

  commentLimit = 4
  comments = data
  
  renderPagination(2)
})

it('should show data based on query', () => {
  const result = filterData(data, "body", "laudantium enim")
  chai.expect(result).to.deep.equal(data)
})