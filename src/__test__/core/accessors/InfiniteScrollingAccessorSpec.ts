import {
  InfiniteScrollingAccessor, ImmutableQuery, PageSizeAccessor,
  AccessorManager
} from "../../../"


describe("InfiniteScrollingAccessor", ()=> {

  beforeEach(()=> {
    this.accessor = new InfiniteScrollingAccessor("p")
  })

  it("onStateChange should flush", ()=> {
    expect(this.accessor.state.getValue()).toBe(1)
    this.accessor.state = this.accessor.state.setValue(3)
    expect(this.accessor.state.getValue()).toBe(3)

    // Don't take key into account and flush
    this.accessor.onStateChange({p:2})
    expect(this.accessor.state.getValue()).toBe(null)
    
    // Flush on any state change
    this.accessor.state = this.accessor.state.setValue(2)
    this.accessor.onStateChange({anything:2})
    expect(this.accessor.state.getValue()).toBe(null)
  })

  it("buildOwnQuery and postProcessQuery", ()=> {
    let query = new ImmutableQuery().setSize(20)

    const expectStateFrom = (state, from, shouldAppendResults)=> {
      this.accessor.state = this.accessor.state.setValue(state)
      let newQuery = query.setAggs({})
       newQuery = this.accessor.buildOwnQuery(newQuery)
       newQuery = this.accessor.postProcessQuery(newQuery)
      expect(newQuery.getPage()).toBe(state || 1)
      expect(newQuery.getFrom()).toBe(from)
      expect(newQuery.shouldAppendResults()).toBe(shouldAppendResults)
      if (shouldAppendResults){
        expect(newQuery.index.aggs).toBe(undefined)
      } else {
        expect(newQuery.index.aggs).toEqual({})
        
      }
    }
    expectStateFrom(null, undefined, undefined)
    expectStateFrom(1, undefined, undefined)
    expectStateFrom(2, 20, true)
    expectStateFrom(3, 40, true)
  })
})
