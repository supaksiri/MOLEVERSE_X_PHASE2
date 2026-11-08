import test from 'node:test';import assert from 'node:assert/strict';
import {atomsIn,molarMass,chemistryState,parseAnswer,closeEnough,formatNumber} from '../src/core/chemistry.js';
test('parse nested formula groups',()=>{assert.deepEqual(atomsIn('Al2(SO4)3'),{Al:2,S:3,O:12});assert.deepEqual(atomsIn('Pb(NO3)2'),{Pb:1,N:2,O:6});assert.equal(molarMass('C9H8O4'),180);assert.equal(molarMass('Ca(NO3)2'),164)});
test('mole mass and particle conversions',()=>{let s=chemistryState('H2O',36,'g');assert.equal(s.n,2);assert.equal(s.N,1.204e24);assert.equal(s.V,null);assert.equal(chemistryState('CO2',22,'g').V,11.2);assert.equal(chemistryState('NaCl',.5,'mol').m,29.25)});
test('notation and tolerant checking',()=>{assert.equal(parseAnswer('3.01e23'),3.01e23);assert.ok(closeEnough(parseAnswer('3.01 × 10²³'),3.01e23));assert.ok(closeEnough(parseAnswer('3.01*10^23'),3.01e23));assert.ok(closeEnough(3.01e23,3.01e23));assert.ok(!closeEnough(3.1e23,3.01e23));assert.ok(formatNumber(1.204e24).includes('10'))});
test('input validations',()=>{assert.throws(()=>atomsIn('C2H4)'));assert.throws(()=>chemistryState('O2',-1,'mol'));assert.throws(()=>atomsIn('Qq2'))});
