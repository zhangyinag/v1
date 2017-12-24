import http from '@/utils/http'

describe('http.js', () => {
  it('should work', done => {
    http({
      url: '/books',
      method: 'get'
    }).then(res => {
      expect(res).to.be.an('object')
      done()
    }, () => {
      done()
    })
  })
})
