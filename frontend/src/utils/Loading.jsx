import React from 'react'
import { Container, Spinner, Row, Col } from 'reactstrap'

const Loading = () => {
   return (
      <div className="loading-container" style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
         <Spinner color="dark"
            type="grow" />
      </div>
   )
}

export default Loading