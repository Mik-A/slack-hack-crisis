import React from 'react'

const Logo = ({ style = {}, height = '90', className = '' }) => (
  <img
    height={height}
    style={style}
    className={className}
    src='https://images.squarespace-cdn.com/content/v1/5e71e8839363663a9a18e706/1584527714861-GUXQ97Z4X8UK59O40UR2/ke17ZwdGBToddI8pDm48kGvciYz_F7e2cKgHl6aKbOB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0plTTeHYrlyi_Cyj6U47Ht_An_pd7DXCQtY9MO8JUvHPqFzi_HokyrAbda5AFEpdOw/testi.png?format=2500w'
    alt='logo'
  />
)
export default Logo
