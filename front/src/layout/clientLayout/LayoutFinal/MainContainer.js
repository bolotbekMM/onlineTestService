import styled from 'styled-components'

const Container = styled.div`
   width: 1092px;
   margin-left: auto;
   margin-right: auto;
`

const MainContainer = ({ children }) => {
   return <Container>{children}</Container>
}
export default MainContainer
