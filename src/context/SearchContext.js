import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [degreeType, setDegreeType] = useState('');
  const [desiredDegree, setDesiredDegree] = useState('');
  const [subjectOfInterest, setSubjectOfInterest] = useState('');
  const [origDegreeType, setOrigDegreeType] = useState('');
  const [origDesiredDegree, setOrigDesiredDegree] = useState('');
  const [origSubjectOfInterest, setOrigSubjectOfInterest] = useState('');
  const [budget, setBudget] = useState('');
  const [origBudget, setOrigBudget] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enrollmentTime, setEnrollmentTime] = useState('');
  const [universityStatus, setUniversityStatus] = useState('');
  const [workStatus, setWorkStatus] = useState('');
  const [studyTime, setStudyTime] = useState('');
  const [categories, setCategories] = useState('');

  return (
    <SearchContext.Provider 
    value={{ degreeType, setDegreeType, desiredDegree, setDesiredDegree, subjectOfInterest, setSubjectOfInterest, origBudget, setOrigBudget,
      origDegreeType, setOrigDegreeType, origDesiredDegree, setOrigDesiredDegree, origSubjectOfInterest, setOrigSubjectOfInterest,
    budget, setBudget, firstName, setFirstName, lastName, setLastName, phone, setPhone, email, setEmail, enrollmentTime, setEnrollmentTime,
    universityStatus, setUniversityStatus, workStatus, setWorkStatus, studyTime, setStudyTime, categories, setCategories }}>
      {children}
    </SearchContext.Provider>
  );
}
