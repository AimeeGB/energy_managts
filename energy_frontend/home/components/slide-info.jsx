import React from 'react'

const SlideInfo = () => {
  return (
    <>
      <main className='mt-5'>
          <div className='container'>
              <div id='carouselExampleIndicators' className='carousel slide my-4 border bg-dark text-white p-3' 
              data-bs-ride ='true'>
                <div className='carousel-indicators'>
                  <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='0' 
                  className='active' aria-current='true' aria-label='Slide 1'></button>
                  <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='1' 
                  aria-label='Slide 2'></button>
                  <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='2'
                  aria-label='Slide 3'></button>
                </div>
                <div className='carousel-inner'>
                  <div className='carousel-item active'>
                    <figure className='text-center'>
                      <blockquote className='blockquote'>
                        <p>All well</p>
                      </blockquote>
                      <figcaption className='blockquote-footer'>
                        Some famous in <cite title='Source Title'>Source Title</cite>
                      </figcaption>
                    </figure>
                  </div>
                  <div className='carousel-item'>
                    <figure className='text-center'>
                      <blockquote className='blockquote'>
                        <p>All well</p>
                      </blockquote>
                      <figcaption className='blockquote-footer'>
                        Some famous in <cite title='Source Title'>Source Title</cite>
                      </figcaption>
                    </figure>
                  </div>
                  <div className='carousel-item'>
                    <figure className='text-center'>
                      <blockquote className='blockquote'>
                        <p>All well</p>
                      </blockquote>
                      <figcaption className='blockquote-footer'>
                        Some famous in <cite title='Source Title'>Source Title</cite>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                <button className='carousel-control-prev' type='button' 
                data-bs-target='#carouselExampleIndicators' data-bs-slide='prev'>
                  <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                  <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button' 
                data-bs-target='#carouselExampleIndicators' data-bs-slide='next'>
                  <span className='carousel-control-next-icon' aria-hidden='true'></span>
                  <span className='visually-hidden'>Next</span>
                </button>
              </div>
          </div>
      </main>
  </>
  )
}

export default SlideInfo