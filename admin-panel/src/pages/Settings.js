import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCog, FaBell, FaLock, FaPalette, FaSave, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { THEME_CONFIG } from '../config';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
  transition: all 0.3s ease;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  margin: 0;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SettingsCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${THEME_CONFIG.light.buttonText};
`;

const CardTitle = styled.h2`
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  margin: 0;
  font-size: 1.25rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  border-radius: 4px;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${props => props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border};
  border-radius: 4px;
  background: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.background : THEME_CONFIG.light.background};
  color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary};
  }
`;

const Switch = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const SwitchInput = styled.input`
  display: none;
`;

const SwitchSlider = styled.div`
  position: relative;
  width: 50px;
  height: 24px;
  background: ${props => props.checked 
    ? (props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary)
    : (props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border)};
  border-radius: 12px;
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: ${props => props.checked ? '26px' : '2px'};
    transition: all 0.3s ease;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  background: ${props => props.variant === 'primary' 
    ? (props.theme === 'dark' ? THEME_CONFIG.dark.primary : THEME_CONFIG.light.primary)
    : (props.theme === 'dark' ? THEME_CONFIG.dark.surface : THEME_CONFIG.light.surface)};
  color: ${props => props.variant === 'primary' 
    ? THEME_CONFIG.light.buttonText 
    : (props.theme === 'dark' ? THEME_CONFIG.dark.text : THEME_CONFIG.light.text)};
  border: 1px solid ${props => props.variant === 'primary' 
    ? 'transparent'
    : (props.theme === 'dark' ? THEME_CONFIG.dark.border : THEME_CONFIG.light.border)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme === 'dark' ? THEME_CONFIG.dark.shadow : THEME_CONFIG.light.shadow};
  }

  &:active {
    transform: translateY(0);
  }
`;

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: false,
    language: 'en',
    timezone: 'UTC',
    currency: 'USD',
    emailFrequency: 'daily',
    notificationTypes: {
      orders: true,
      products: true,
      users: false,
      reviews: true
    },
    displaySettings: {
      showPrices: true,
      showStock: true,
      showRatings: true,
      compactView: false
    },
    backupSettings: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: '30days'
    }
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNestedChange = (parent, key, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const resetSettings = () => {
    setSettings({
      emailNotifications: true,
      pushNotifications: false,
      twoFactorAuth: false,
      language: 'en',
      timezone: 'UTC',
      currency: 'USD',
      emailFrequency: 'daily',
      notificationTypes: {
        orders: true,
        products: true,
        users: false,
        reviews: true
      },
      displaySettings: {
        showPrices: true,
        showStock: true,
        showRatings: true,
        compactView: false
      },
      backupSettings: {
        autoBackup: true,
        backupFrequency: 'daily',
        retentionPeriod: '30days'
      }
    });
  };

  return (
    <Container theme={theme}>
      <MainContent>
        <Header>
          <Title theme={theme}>Settings</Title>
        </Header>

        <SettingsGrid>
          <SettingsCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardHeader>
              <CardIcon theme={theme}>
                <FaBell />
              </CardIcon>
              <CardTitle theme={theme}>Notifications</CardTitle>
            </CardHeader>

            <FormGroup>
              <Switch>
                <SwitchInput
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
                <SwitchSlider theme={theme} checked={settings.emailNotifications} />
                <span>Email Notifications</span>
              </Switch>
            </FormGroup>

            <FormGroup>
              <Switch>
                <SwitchInput
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                />
                <SwitchSlider theme={theme} checked={settings.pushNotifications} />
                <span>Push Notifications</span>
              </Switch>
            </FormGroup>
          </SettingsCard>

          <SettingsCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <CardHeader>
              <CardIcon theme={theme}>
                <FaLock />
              </CardIcon>
              <CardTitle theme={theme}>Security</CardTitle>
            </CardHeader>

            <FormGroup>
              <Switch>
                <SwitchInput
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={() => handleToggle('twoFactorAuth')}
                />
                <SwitchSlider theme={theme} checked={settings.twoFactorAuth} />
                <span>Two-Factor Authentication</span>
              </Switch>
            </FormGroup>
          </SettingsCard>

          <SettingsCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <CardHeader>
              <CardIcon theme={theme}>
                <FaPalette />
              </CardIcon>
              <CardTitle theme={theme}>Appearance</CardTitle>
            </CardHeader>

            <FormGroup>
              <Label theme={theme}>Theme</Label>
              <Select
                theme={theme}
                value={theme}
                onChange={(e) => toggleTheme()}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>Language</Label>
              <Select
                theme={theme}
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </Select>
            </FormGroup>
          </SettingsCard>

          <SettingsCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <CardHeader>
              <CardIcon theme={theme}>
                <FaCog />
              </CardIcon>
              <CardTitle theme={theme}>Preferences</CardTitle>
            </CardHeader>

            <FormGroup>
              <Label theme={theme}>Timezone</Label>
              <Select
                theme={theme}
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
                <option value="GMT">GMT</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>Currency</Label>
              <Select
                theme={theme}
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </Select>
            </FormGroup>
          </SettingsCard>
        </SettingsGrid>

        <ButtonGroup>
          <Button
            theme={theme}
            variant="primary"
            onClick={handleSave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSave /> Save Changes
          </Button>
          <Button
            theme={theme}
            onClick={resetSettings}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaTimes /> Reset
          </Button>
        </ButtonGroup>
      </MainContent>
    </Container>
  );
};

export default Settings; 