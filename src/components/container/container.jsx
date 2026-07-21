import react from 'react'

function Container ({Children}) {
    return (
        <div className='w-full max-w-7x1 mx-auto px-4'>
            {Children}
        </div>
    )
}

export default Container;