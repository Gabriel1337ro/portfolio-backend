import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

const HomeScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchProjects();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/public/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/public/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: profile.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.jobTitle}>{profile.jobTitle}</Text>
        <Text style={styles.about}>{profile.about}</Text>
      </View>

      <View style={styles.projectsSection}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {projects.map((project) => (
          <TouchableOpacity
            key={project.id}
            style={styles.projectCard}
            onPress={() => navigation.navigate('ProjectDetails', { project })}
          >
            <Image
              source={{ uri: project.imageUrl }}
              style={styles.projectImage}
            />
            <View style={styles.projectInfo}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDescription} numberOfLines={2}>
                {project.description}
              </Text>
              <Text style={styles.technologies}>{project.technologiesUsed}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  about: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    lineHeight: 24,
  },
  projectsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  projectImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  projectInfo: {
    padding: 15,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  technologies: {
    fontSize: 12,
    color: '#888',
  },
});

export default HomeScreen; 