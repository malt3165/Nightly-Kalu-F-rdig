import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Trophy, Crown, Medal, Users } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const mockLeaderboard = [
  { id: '1', name: 'Mia', points: '14.500 kr.', rank: 1, isCurrentUser: false },
  { id: '2', name: 'Martin', points: '12.500 kr.', rank: 2, isCurrentUser: false },
  { id: '3', name: 'Frederik', points: '32.400 kr.', rank: 3, isCurrentUser: true },
  { id: '4', name: 'Festbarden', points: '23.600 kr.', rank: 4, isCurrentUser: false },
  { id: '5', name: 'Gutterne', points: '25.700 kr.', rank: 5, isCurrentUser: false },
];

const mockGroups = [
  { id: '1', name: 'Weekend Warriors', points: '45.200 kr.', rank: 1, members: 8 },
  { id: '2', name: 'Party Squad', points: '38.900 kr.', rank: 2, members: 12 },
  { id: '3', name: 'Night Owls', points: '32.100 kr.', rank: 3, members: 6 },
];

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState('brugere');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={18} color="#FFD700" />;
      case 2:
        return <Medal size={18} color="#C0C0C0" />;
      case 3:
        return <Trophy size={18} color="#CD7F32" />;
      default:
        return (
          <View style={styles.rankNumberContainer}>
            <Text style={styles.rankNumber}>{rank}</Text>
          </View>
        );
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderUsers = () => (
    <View style={styles.section}>
      <View style={styles.leaderboardList}>
        {mockLeaderboard.map((user, index) => (
          <View 
            key={user.id} 
            style={[
              styles.leaderboardCard,
              user.isCurrentUser && styles.currentUserCard
            ]}
          >
            <View style={styles.leftSection}>
              <View style={styles.rankContainer}>
                {getRankIcon(user.rank)}
              </View>
              
              <View style={styles.avatarContainer}>
                <View style={[
                  styles.avatar,
                  user.isCurrentUser && styles.currentUserAvatar
                ]}>
                  <Text style={[
                    styles.avatarText,
                    user.isCurrentUser && styles.currentUserAvatarText
                  ]}>
                    {getInitials(user.name)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.userDetails}>
                <Text style={[
                  styles.userName,
                  user.isCurrentUser && styles.currentUserName
                ]}>
                  {user.name}
                </Text>
              </View>
            </View>
            
            <View style={styles.rightSection}>
              <Text style={styles.userPoints}>{user.points}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderGroups = () => (
    <View style={styles.section}>
      <View style={styles.leaderboardList}>
        {mockGroups.map((group, index) => (
          <View key={group.id} style={styles.leaderboardCard}>
            <View style={styles.leftSection}>
              <View style={styles.rankContainer}>
                {getRankIcon(group.rank)}
              </View>
              
              <View style={styles.avatarContainer}>
                <View style={styles.groupAvatar}>
                  <Users size={16} color="#fff" />
                </View>
              </View>
              
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{group.name}</Text>
                <Text style={styles.groupMembers}>{group.members} medlemmer</Text>
              </View>
            </View>
            
            <View style={styles.rightSection}>
              <Text style={styles.userPoints}>{group.points}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'brugere' && styles.activeTab]}
            onPress={() => setActiveTab('brugere')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'brugere' && styles.activeTabText
            ]}>
              Brugere
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'grupper' && styles.activeTab]}
            onPress={() => setActiveTab('grupper')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'grupper' && styles.activeTabText
            ]}>
              Grupper
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {activeTab === 'brugere' && renderUsers()}
          {activeTab === 'grupper' && renderGroups()}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  headerRight: {
    width: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#999',
  },
  activeTabText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  leaderboardList: {
    gap: 8,
  },
  leaderboardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  currentUserCard: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumberContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentUserAvatar: {
    backgroundColor: '#007AFF',
  },
  avatarText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  currentUserAvatarText: {
    color: '#fff',
  },
  groupAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  currentUserName: {
    color: '#007AFF',
  },
  groupMembers: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  userPoints: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
});