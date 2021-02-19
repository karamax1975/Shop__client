import { useSelector } from 'react-redux'
import './inputGallery.css'

export default function InputGallery({ style, value, action, galeryMode = false }) {
  const { preloader } = useSelector(state => state.productStore)
  // value = false

  return (
    <div className={`preview ${style}`}>
      {!galeryMode
        ? <label>
          <input type='file' onChange={(e) => action(e.target.files[0])} />
          <svg width="30" height="37" viewBox="0 0 30 37" fill="none">
            <path d="M28.9348 32.976V9.49913C28.9348 8.70348 28.6188 7.94041 28.0562 7.37781L23.2998 2.62142C22.7372 2.05881 21.9741 1.74274 21.1784 1.74274H4C2.34315 1.74274 1 3.08588 1 4.74274V32.976C1 34.6329 2.34315 35.976 4 35.976H25.9348C27.5917 35.976 28.9348 34.6329 28.9348 32.976Z" />
            <path d="M20.6201 2L20.6201 5.68512C20.6201 7.89426 22.411 9.68513 24.6201 9.68513H28.3052" />
            <path d="M9.57715 19.3598H20.3574" strokeLinecap="round" />
            <path d="M14.9673 13.9697L14.9673 24.7499" strokeLinecap="round" />
          </svg>
        </label>
        : <div className='preview__galery-wrapper' onClick={() => action(value)}>
          {preloader
            ? <div>Preloader</div>
            : <img className='upload_img' src={`upload/${value}`} alt='preview' />
          }

        </div>


      }

    </div>
  )
}