import { useState, useCallback } from 'react';

const useContacts = (initialContacts = []) => {
  const [contacts, setContacts] = useState(initialContacts);
  const [loading, setLoading] = useState(false);

  const addContact = useCallback((contact) => {
    const newContact = {
      id: Date.now(),
      ...contact,
      status: 'pending',
      createdAt: new Date(),
      enrichedAt: null,
      confidence: 0
    };
    setContacts(prev => [...prev, newContact]);
    return newContact;
  }, []);

  const updateContact = useCallback((contactId, updates) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? { ...contact, ...updates, updatedAt: new Date() }
        : contact
    ));
  }, []);

  const deleteContact = useCallback((contactId) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  }, []);

  const enrichContacts = useCallback(async (contactIds) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setContacts(prev => prev.map(contact => {
        if (contactIds.includes(contact.id) && contact.status === 'pending') {
          return {
            ...contact,
            email: contact.email || `${contact.firstName.toLowerCase()}.${contact.lastName.toLowerCase()}@${contact.company.toLowerCase().replace(/\s+/g, '')}.com`,
            phone: contact.phone || `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
            linkedinUrl: contact.linkedinUrl || `https://linkedin.com/in/${contact.firstName.toLowerCase()}${contact.lastName.toLowerCase()}`,
            status: 'enriched',
            enrichedAt: new Date(),
            confidence: Math.floor(Math.random() * 20) + 80
          };
        }
        return contact;
      }));
    } catch (error) {
      console.error('Enrichment error:', error);
      // Mark failed contacts
      setContacts(prev => prev.map(contact => 
        contactIds.includes(contact.id) && contact.status === 'pending'
          ? { ...contact, status: 'failed' }
          : contact
      ));
    } finally {
      setLoading(false);
    }
  }, []);

  const bulkImport = useCallback((contactsData) => {
    const newContacts = contactsData.map((contact, index) => ({
      id: Date.now() + index,
      ...contact,
      status: 'pending',
      source: 'csv-upload',
      createdAt: new Date(),
      enrichedAt: null,
      confidence: 0,
      tags: contact.tags || []
    }));
    
    setContacts(prev => [...prev, ...newContacts]);
    return newContacts;
  }, []);

  const getContactStats = useCallback(() => {
    const total = contacts.length;
    const enriched = contacts.filter(c => c.status === 'enriched').length;
    const pending = contacts.filter(c => c.status === 'pending').length;
    const failed = contacts.filter(c => c.status === 'failed').length;
    const successRate = total > 0 ? Math.round((enriched / total) * 100) : 0;

    return {
      total,
      enriched,
      pending,
      failed,
      successRate
    };
  }, [contacts]);

  return {
    contacts,
    setContacts,
    loading,
    addContact,
    updateContact,
    deleteContact,
    enrichContacts,
    bulkImport,
    getContactStats
  };
};

export default useContacts;
