
export default function CountriesShimmer({isDark}) {
  return (
    <div className={`countries-container ${isDark ? 'dark': ''}`}>
        {
            Array.from({length:50}).map((el, i)=>{
                return <div key={i} className={`country-card shimmer-card ${isDark ? 'dark': ''}`}></div>

            })
        }
    </div>
  )
}
