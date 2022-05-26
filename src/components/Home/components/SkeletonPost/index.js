import './index.scss'

export default function SkeletonPost() {
  return(
    <li>
    <div className='text-post'>
    <div className='post-user-info'>
      <div className='skeleton-post-user-pic'/>
      <p className='skeleton-post-user-name'></p>
    </div>
    <div className='post-content'>
      <p className='skeleton-post-text'></p>
      <p className='skeleton-post-text' style={{width: '50%', marginTop: '0.5rem'}}></p>
    </div>
    </div>
    
  </li>
  )
}