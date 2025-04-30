package com.qsp.Hospital_Management.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qsp.Hospital_Management.model.Billing;
import com.qsp.Hospital_Management.service.BillingService;

@RestController
@RequestMapping("api/bills")
public class BillingController {
	
	@Autowired
	private BillingService billingService;
	
	@PostMapping("/save")
	public Billing saveBilling(@RequestBody Billing billing) {
		return billingService.saveBilling(billing);
	}

	@GetMapping("/fetchAll")
	public List<Billing> getAllBillings() {
		return billingService.getAllBillings();
	}

	@GetMapping("/fetchBillById")
	public Billing getBillingById(@RequestParam Long billId) {
		return billingService.getBillingById(billId);
	}

	@DeleteMapping("/deleteBillById")
	public boolean deleteBillingById(@RequestParam Long billId) {
		return billingService.deleteBillingById(billId);
	}

	@PutMapping("/updateBillById")
	public Billing updateBillingById(@RequestParam Long billId, @RequestBody Billing newBilling) {
		return billingService.updateBillingById(billId, newBilling);
	}

	@GetMapping("/billStatus")
	public List<Billing> getBillingsByStatus(@RequestParam String status) {
		return billingService.getBillingsByStatus(status);
	}

	@GetMapping("/fetchPatientBill")
	public List<Billing> getBillingsByPatientId(@RequestParam Long patientId) {
		return billingService.getBillingsByPatientId(patientId);
	}

	@GetMapping("/billBetweenDates")
	public List<Billing> getBillingsBetweenDates(@RequestParam("start") LocalDate startDate, @RequestParam("end") LocalDate endDate) {
		return billingService.getBillingsBetweenDates(startDate, endDate); 
	}

}
