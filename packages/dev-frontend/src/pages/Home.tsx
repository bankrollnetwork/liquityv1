/** @jsxImportSource theme-ui */
import React from 'react';
import {
  ThemeUIProvider,
  Container,
  Box,
  Flex,
  Button,
  Heading,
  Text,
  useColorMode,
} from 'theme-ui';

// Define a theme object with light and dark color modes
const theme = {
  initialColorModeName: 'light',
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#0077cc',
    secondary: '#FF4081',
    muted: '#f6f6f6',
    modes: {
      dark: {
        text: '#fff',
        background: '#121212',
        primary: '#0cf',
        secondary: '#FF4081',
        muted: '#1e1e1e',
      },
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 1.5,
      fontWeight: 400,
      margin: 0,
    },
  },
};

// Header component with navigation and a theme toggle button
const Header: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();
  const toggleColorMode = () =>
    setColorMode(colorMode === 'light' ? 'dark' : 'light');

  return (
    <Flex
      as="header"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 3,
        px: 4,
        borderBottom: '1px solid',
        borderColor: 'muted',
      }}
    >
      <Heading as="h1" sx={{ fontSize: 4, m: 0 }}>
        Kudu
      </Heading>
      <Flex as="nav" sx={{ alignItems: 'center' }}>
        <Button variant="text" sx={{ mr: 2 }}>
          Home
        </Button>
        <Button variant="text" sx={{ mr: 2 }}>
          About
        </Button>
        <Button variant="text" sx={{ mr: 2 }}>
          Docs
        </Button>
        <Button onClick={toggleColorMode} variant="outline">
          {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </Flex>
    </Flex>
  );
};

// Hero section introducing Kudu
const Hero: React.FC = () => (
  <Box
    as="section"
    sx={{
      textAlign: 'center',
      py: 5,
      backgroundColor: 'primary',
      color: 'background',
    }}
  >
    <Heading as="h2" sx={{ fontSize: [4, 5], mb: 3 }}>
      Welcome to Kudu
    </Heading>
    <Text sx={{ fontSize: [2, 3], mb: 4, maxWidth: 640, mx: 'auto' }}>
      Kudu is a robust and secure fork of Liquity v1, providing decentralized,
      collateralized borrowing with a focus on stability and accessibility.
    </Text>
    <Button variant="primary" sx={{ fontSize: 2 }}>
      Get Started
    </Button>
  </Box>
);

// About section providing an overview of the protocol
const About: React.FC = () => (
  <Box as="section" sx={{ py: 4, px: [3, 4] }}>
    <Heading as="h3" sx={{ fontSize: 4, mb: 3, textAlign: 'center' }}>
      About Kudu
    </Heading>
    <Text sx={{ fontSize: 2, lineHeight: 1.75, mb: 3 }}>
      Kudu builds on the pioneering work of Liquity v1 to create a decentralized
      borrowing protocol that is secure, efficient, and transparent. With an
      innovative stability mechanism and a community-driven approach, Kudu is
      set to empower users with financial freedom in the DeFi ecosystem.
    </Text>
    <Text sx={{ fontSize: 2, lineHeight: 1.75 }}>
      Whether you're a seasoned crypto investor or new to decentralized finance,
      Kudu offers a user-friendly experience with robust features and strong
      security measures. Join us as we redefine the landscape of decentralized
      borrowing.
    </Text>
  </Box>
);

// Features section showcasing key functionalities
const Features: React.FC = () => (
  <Box as="section" sx={{ py: 4, backgroundColor: 'muted' }}>
    <Container>
      <Heading as="h3" sx={{ fontSize: 4, mb: 4, textAlign: 'center' }}>
        Key Features
      </Heading>
      <Flex sx={{ flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <Box
          sx={{
            width: ['100%', '45%'],
            mb: 3,
            p: 3,
            border: '1px solid',
            borderColor: 'primary',
            borderRadius: 4,
          }}
        >
          <Heading as="h4" sx={{ fontSize: 3, mb: 2 }}>
            Decentralized Governance
          </Heading>
          <Text sx={{ fontSize: 2 }}>
            Participate in community-driven decisions that shape the future of Kudu.
          </Text>
        </Box>
        <Box
          sx={{
            width: ['100%', '45%'],
            mb: 3,
            p: 3,
            border: '1px solid',
            borderColor: 'primary',
            borderRadius: 4,
          }}
        >
          <Heading as="h4" sx={{ fontSize: 3, mb: 2 }}>
            Collateralized Borrowing
          </Heading>
          <Text sx={{ fontSize: 2 }}>
            Secure loans backed by crypto collateral with low interest rates.
          </Text>
        </Box>
        <Box
          sx={{
            width: ['100%', '45%'],
            mb: 3,
            p: 3,
            border: '1px solid',
            borderColor: 'primary',
            borderRadius: 4,
          }}
        >
          <Heading as="h4" sx={{ fontSize: 3, mb: 2 }}>
            Automated Stability Mechanisms
          </Heading>
          <Text sx={{ fontSize: 2 }}>
            Innovative mechanisms ensure protocol stability and sustainability.
          </Text>
        </Box>
        <Box
          sx={{
            width: ['100%', '45%'],
            mb: 3,
            p: 3,
            border: '1px solid',
            borderColor: 'primary',
            borderRadius: 4,
          }}
        >
          <Heading as="h4" sx={{ fontSize: 3, mb: 2 }}>
            Open Source & Transparent
          </Heading>
          <Text sx={{ fontSize: 2 }}>
            Audit-ready code and transparent operations for full community trust.
          </Text>
        </Box>
      </Flex>
    </Container>
  </Box>
);

// Footer component with copyright notice
const Footer: React.FC = () => (
  <Box
    as="footer"
    sx={{
      py: 4,
      backgroundColor: 'primary',
      color: 'background',
      textAlign: 'center',
    }}
  >
    <Text sx={{ fontSize: 1 }}>
      © {new Date().getFullYear()} Kudu. All rights reserved.
    </Text>
  </Box>
);

// Main Home component that brings all sections together
export const Home: React.FC = () => (
    <ThemeUIProvider theme={theme}>  
        <Box>
            <Header />
            <Hero />
            <About />
            <Features />
            <Footer />
        </Box>
    </ThemeUIProvider>
);
