import styled from 'styled-components'

const Container = styled.div`
   width: 900px;
   margin-left: auto;
   margin-right: auto;
`

const MainContainer = ({ children }) => {
   return <Container>{children}</Container>
}
export default MainContainer
